const GoogleButton = ({ ...rest }) => {
  return (
    <button
      className="flex items-center justify-center w-full max-w-lg p-3 space-x-4 rounded shadow hover:bg-gray-100"
      {...rest}
    >
      <img
        alt="Google"
        className="w-4 h-4"
        src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
      />
      <span className="sub-text">Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;
