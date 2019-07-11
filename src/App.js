import React from 'react';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors =>
{
  let valid = true;
  Object.values(formErrors).forEach(val =>
    {
      val.length>0 && (valid=false)
    });
    return valid;
}

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      firstName:null,
      lastName:null,
      email:null,
      password:null,
      formErrors:{
      firstName:"",
      lastName:"",
      email:"",
      password:"",

      }
    }
  }

  handleSubmit = e =>
  {
    console.log("submit");
    e.preventDefault();

    if(formValid(this.state.formErrors))
    {
      console.log(`
      ==submitting form==
      FirstName:${this.state.firstName}
      LastName:${this.state.lastName}
      Email:${this.state.email}
      Password:${this.state.password}
      `);
      this.setState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
      });


    }
  }

  handleChange = e =>
  {
    e.preventDefault();
    const {name,value} = e.target;
    let formErrors = this.state.formErrors;

    switch(name)
    {
      case "firstName":
        formErrors.firstName = value.length<3 && value.length>0 ?"Minimum 3 characters required":"";
        break;
        case "lastName":
        formErrors.lastName = value.length<3 && value.length>0 ?"Minimum 3 characters required":"";
        break;
        case "email":
        formErrors.email = emailRegex.test(value)?"":"Invalid email address";
        break;
        case "password":
        formErrors.password = value.length<6 && value.length>0 ?"Minimum 6 characters required":"";
        break; 
        default:
        break;
    }
    this.setState({formErrors,[name]:value});
  }
  render()
  {
    const formErrors = this.state.formErrors;
    return(
      <div className="wrapper">
        <div className="form-wrapper">
        <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
               type="text"
               className={formErrors.firstName.length >0 ?"error":null}
               placholder="First Name"
               name="firstName"
               noValidate
               onChange={this.handleChange}
               value={this.state.firstName}
               />
               {formErrors.firstName.length !=null && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
               type="text"
               className={formErrors.lastName.length > 0 ?"error":null}
               placholder="Last Name"
               name="lastName"
               noValidate
               onChange={this.handleChange}
               value={this.state.lastName}
               />
               {formErrors.lastName.length>0 &&(<span className="errorMessage">{formErrors.lastName}</span>)}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
               type="emil"
               className={formErrors.email.length >0 ? "error":null}
               placholder="Email"
               name="email"
               noValidate
               onChange={this.handleChange}
               value={this.state.email}
               />
               {formErrors.email.length > 0 &&(<span className="errorMessage">{formErrors.email}</span>)}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
               type="password"
               className={formErrors.password.length > 0 ? "error" : null}
               placholder="Password"
               name="password"
               noValidate
               onChange={this.handleChange}
               value={this.state.password}
               />
               {formErrors.password.length>0 &&(<span className="errorMessage">{formErrors.password}</span>)}
            </div>

            <div className="createAccount">
              <button type="submit" >Create Account</button>
              <small>Already have an account?</small>
            </div>

          </form>
          </div>
      </div>
    );
  }
}

export default App;
