const Button = ({ onClick, children }) => (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
  export default Button;