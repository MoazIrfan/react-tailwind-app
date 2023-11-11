import githubLogo from '/src/assets/github.svg'
import './App.css'

function App() {

  return (
    <>
      <h1 className='text-5xl font-bold'>
        <span className="text-gray-600">React</span>{" "}
        with <span className="text-indigo-600">TailwindCSS</span>
      </h1>
      <div className="card text-center">
         <a className="flex justify-center" href="https://github.com/MoazIrfan/react-tailwind-app" target="_blank">
          <img src={githubLogo} className="logo" alt="GitHub logo" />
        </a>
      </div>
      <p className='text-lg text-gray-500'>Start React Vite project with TailwindCSS.</p>
    </>
  )
}

export default App
