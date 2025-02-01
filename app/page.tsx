import SearchDialog from '@/components/search-dialog'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-8">AI Search Assistant</h1>
      <div className="w-full max-w-2xl">
        <SearchDialog />
      </div>
    </div>
  )
}
