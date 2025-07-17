export default function AuthToggle({ isLogin, onToggle }) {
  return (
    <div className="text-center my-4">
      <button
        onClick={onToggle}
        className="text-sm text-gray-600 hover:text-blue-600 underline transition"
      >
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}
