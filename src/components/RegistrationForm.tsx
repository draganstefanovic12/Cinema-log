export const RegistrationForm = () => {
  return (
    <div className="form-container">
      <form method="POST" action="http://localhost:5000/user/signup">
        <label htmlFor="username">User name:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button>Submit</button>
      </form>
    </div>
  );
};
