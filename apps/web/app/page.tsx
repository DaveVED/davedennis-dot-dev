import styles from '../styles/page.module.css'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">
        Hello, Tailwind CSS!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        This is a simple test to see if Tailwind CSS is working.
      </p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Tailwind Button
      </button>
      <div className={styles.customStyle}>
        This text is styled using CSS Modules.
      </div>
    </div>
  )
}