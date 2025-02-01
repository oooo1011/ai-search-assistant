-- Enable pgvector extension
create extension if not exists vector;

-- Create tables
create table if not exists chat_histories (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade
);

create table if not exists chat_messages (
    id uuid primary key default gen_random_uuid(),
    chat_history_id uuid references chat_histories(id) on delete cascade,
    role text not null check (role in ('user', 'assistant', 'system')),
    content text not null,
    knowledge_base_id uuid,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade
);

create table if not exists knowledge_bases (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade
);

create table if not exists knowledge_files (
    id uuid primary key default gen_random_uuid(),
    knowledge_base_id uuid references knowledge_bases(id) on delete cascade,
    name text not null,
    path text not null,
    type text not null,
    size bigint not null,
    content text,
    embedding vector(1536),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade
);

-- Create indexes
create index if not exists chat_histories_user_id_idx on chat_histories(user_id);
create index if not exists chat_messages_chat_history_id_idx on chat_messages(chat_history_id);
create index if not exists chat_messages_user_id_idx on chat_messages(user_id);
create index if not exists knowledge_bases_user_id_idx on knowledge_bases(user_id);
create index if not exists knowledge_files_knowledge_base_id_idx on knowledge_files(knowledge_base_id);
create index if not exists knowledge_files_user_id_idx on knowledge_files(user_id);
create index if not exists knowledge_files_embedding_idx on knowledge_files using ivfflat (embedding vector_cosine_ops);

-- Create RLS policies
alter table chat_histories enable row level security;
alter table chat_messages enable row level security;
alter table knowledge_bases enable row level security;
alter table knowledge_files enable row level security;

create policy "Users can view their own chat histories"
    on chat_histories for select
    using (auth.uid() = user_id);

create policy "Users can insert their own chat histories"
    on chat_histories for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own chat histories"
    on chat_histories for update
    using (auth.uid() = user_id);

create policy "Users can delete their own chat histories"
    on chat_histories for delete
    using (auth.uid() = user_id);

create policy "Users can view their own chat messages"
    on chat_messages for select
    using (auth.uid() = user_id);

create policy "Users can insert their own chat messages"
    on chat_messages for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own chat messages"
    on chat_messages for update
    using (auth.uid() = user_id);

create policy "Users can delete their own chat messages"
    on chat_messages for delete
    using (auth.uid() = user_id);

create policy "Users can view their own knowledge bases"
    on knowledge_bases for select
    using (auth.uid() = user_id);

create policy "Users can insert their own knowledge bases"
    on knowledge_bases for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own knowledge bases"
    on knowledge_bases for update
    using (auth.uid() = user_id);

create policy "Users can delete their own knowledge bases"
    on knowledge_bases for delete
    using (auth.uid() = user_id);

create policy "Users can view their own knowledge files"
    on knowledge_files for select
    using (auth.uid() = user_id);

create policy "Users can insert their own knowledge files"
    on knowledge_files for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own knowledge files"
    on knowledge_files for update
    using (auth.uid() = user_id);

create policy "Users can delete their own knowledge files"
    on knowledge_files for delete
    using (auth.uid() = user_id);
