const ErrorHeanding = ({ error }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
        {error}
      </div>
    </div>
  )
}
export default ErrorHeanding
