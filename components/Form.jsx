import Link from "next/link"

const Form = ({
  type, post, setPost, submutting, handleSubmit
}) => {
  return (
     <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text-left">
          <span className="blue_gradient"> {type} Post </span>
        </h1>
        <p className="desc text-left max-w-md"> 
          {type} and share amazing prompts with world, and let yo🇺r 
          imagination run wild with any AI-powered platform.
        </p>

        <form
          onSubmit={handleSubmit}
          className="my-10 w-full max-w-2xl  flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-slate-700">
              Your AI Prompt
            </span>

            <textarea 
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value})}
              placeholder="Write your prompt here..."
              className="form_textarea"
              required
            />
          </label>

          <label>
            <span className="font-satoshi font-semibold text-base text-slate-800">
              Add Tags 
            </span>
            <span className="font-normal text-slate-800 text-sm ml-1">
              (e.g #webdevelopment, #product, #idea)
            </span>

            <input 
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value})}
              placeholder="#tag"
              required
              className="form_input"
            />
          </label>

          <div className="flex-end mx-3 gap-4">
            <Link href='/' className="text-white text-sm bg-red-500 rounded-full px-4 py-1.5 ">
              Cancel
            </Link>

            <button 
              type="submit"
              disabled={submutting}
              className="text-white text-sm bg-green-600 rounded-full px-5 py-1.5 "
            >
              {submutting ? `${type}...` : type}
            </button>
          </div>
        </form>
     </section>
  )
}

export default Form