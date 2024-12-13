import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  function handleUsernameChange(e) {
    setFormData({ ...formData, username: e.target.value.trim() });
  }

  function handleEmailChange(e) {
    setFormData({ ...formData, email: e.target.value.trim() });
  }

  function handlePasswordChange(e) {
    setFormData({ ...formData, password: e.target.value.trim() });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(data.success === false){
         return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-black via-purple-500 to-blue-500 rounded-lg text-white">
              Vicky's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to the best place to get updated on happenings in the tech
            space
          </p>
        </div>

        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col  gap-4 " onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleUsernameChange}
              />
            </div>

            <div>
              <Label value="Email"></Label>
              <TextInput
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleEmailChange}
              />
            </div>

            <div>
              <Label value="Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handlePasswordChange}
              />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign up'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-600">
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>)
          }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
