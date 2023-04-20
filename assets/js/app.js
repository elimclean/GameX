//model
class User {
  #name;
  #username;
  #password;
  #email;
  constructor(name, username, password, email) {
    this.#name = name;
    this.#username = username;
    this.#password = password;
    this.#email = email;
  }
  getName = () => this.#name;
  getUsername = () => this.#username;
  getPassword = () => this.#password;
  getEmail = () => this.#email;
  setPassword = (newPassword) => (this.#password = newPassword);
}
const admin = new User("admin", "admin", "admin", "admin@gamex.com");
const milad = new User("milad", "milad2023", "1234", "milad@gamex.com");
let users = [admin, milad];

//controllor
class UserController {
  constructor(user) {
    this.user = user;
  }

  // check if the email is valid?
  checkValidEmail(email) {
    const result = users.find((user) => user.getEmail() === email);
    if (result) {
      return true;
    }
    return false;
  }

  sendEmail(email, message) {
    console.log("Email send! to:" + email, "Message: " + message);
  }

  checkOldPassword(password) {
    // check if the password is valid?
    if (this.user.getPassword() === password) {
      return true;
    }
    return false;
  }

  changePassword(password) {
    const user = users.find(
      (user) => user.getUsername() === this.user.getUsername()
    );
    if (user) {
      user.setPassword(password);
      const newUsers = users.filter(
        (user) => user.getUsername() !== this.user.getUsername()
      );
      users = [...newUsers, user];
      console.log(users);
      return true;
    }
    return false;
  }
}

function checkEmail(e) {
  e.preventDefault();
  //get value email input
  const email = document.querySelector(".email").value;
  const userController = new UserController(null);
  const result = userController.checkValidEmail(email); //result is a value that backend returns
  if (!result) {
    document.querySelector(".error").innerText = "Email is not correct!";
  } else {
    document.querySelector(".form-container").innerHTML = `
       <div class="send-email">
            <h1>We send  a email to you that includes reset password.
                check your email and click on the link.
            </h1>
            <a href="reset-password.html">click here to reset password</a>
        </div>
       `;
    userController.sendEmail(
      email,
      '<a href="reset-password.html">click here to reset password</a>'
    );
  }
}

function resetPassword(e) {
  e.preventDefault();
  const newPassword = document.querySelector(".new-password").value;
  const rePassword = document.querySelector(".re-password").value;

  if (newPassword !== rePassword) {
    document.querySelector(".re-password-error").innerText =
      "Passwords do not match!";
    return;
  } else {
    document.querySelector(".re-password-error").innerText = "";
  }
  const userController = new UserController(milad);
  userController.changePassword(newPassword);

  document.querySelector(".form-container").innerHTML = `
    <div class="send-email">
         <h1 class="success">
            Your Password changed successfully.
         </h1>
         <a href="index.html">Back To Dashboard</a>
     </div>
    `;
}

function changePassword(e) {
  e.preventDefault();
  const oldPassword = document.querySelector(".old-password").value;
  const newPassword = document.querySelector(".new-password").value;
  const rePassword = document.querySelector(".re-password").value;

  const userController = new UserController(milad);
  //result is a value that backend returns
  const result = userController.checkOldPassword(oldPassword);
  if (!result) {
    document.querySelector(".old-password-error").innerText =
      "Old password is not correct!";
    return;
  } else {
    document.querySelector(".old-password-error").innerText = "";
  }
  if (newPassword !== rePassword) {
    document.querySelector(".re-password-error").innerText =
      "Passwords do not match!";
    return;
  } else {
    document.querySelector(".old-password-error").innerText = "";
  }

  userController.changePassword(newPassword);
  document.querySelector(".form-container").innerHTML = `
    <div class="send-email">
         <h1 class="success">
            Your Password changed successfully.
         </h1>
         <a href="index.html">Back To Dashboard</a>
     </div>
    `;
}

const forgotPasswordForm = document.querySelector(".forgot-password-form");
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", checkEmail);
}
const resetPasswordForm = document.querySelector(".reset-password-form");
if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", resetPassword);
}
const changePasswordForm = document.querySelector(".change-password-form");
if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", changePassword);
}
// ################### Sprint3  Advertisment##############################
class Advertisment {
  #companyName;
  #companyPhoneNumber
  #companyEmail
  #adsCost;
  #startDate;
  #duration;
  #banner;
  #title;
  #text;
  constructor(companyName, companyPhoneNumber, companyEmail, adsCost, startDate, duration, banner, title, text) {
    this.#companyName = companyName;
    this.#companyPhoneNumber = companyPhoneNumber;
    this.#companyEmail = companyEmail;
    this.#adsCost = adsCost;
    this.#startDate = startDate;
    this.#duration = duration;
    this.#banner = banner;
    this.#title = title;
    this.#text = text;

  }
}
const adsRequestForm = document.querySelector(".ads-request-form");
if (adsRequestForm) {
  adsRequestForm.addEventListener("submit", addAdvertisement);
}

class AdsController {
   #advertiseList=[];
  creatAds(companyName, companyPhoneNumber, companyEmail, cost, startDate, duration, banner, title, text) {
   
    const advertisement = new Advertisment(companyName, companyPhoneNumber, companyEmail, cost, startDate, duration, banner, title, text)
  
    this.#advertiseList.push(addAdvertisement);
  }
}


function addAdvertisement(e) {
  e.preventDefault();
  const companyName = document.querySelector(".company-name").value;
  const companyEmail = document.querySelector(".company-email").value;
  const companyPhoneNumber = document.querySelector(".company-phone-number").value;
  const costDuration = document.querySelector(".ads-cost").value;
  const startDate = document.querySelector(".start-date").value;
  const banner = document.querySelector(".banner").value;
  const title = document.querySelector(".title-ads").value;
  const text = document.querySelector(".text-ads").value;

  const adsCost = costDuration.split("-")
  const cost = adsCost[0]
  const duration = adsCost[1]

  const adsCntr=new AdsController();
  adsCntr.creatAds(companyName, companyPhoneNumber, companyEmail, cost, startDate, duration, banner, title, text)

  const advertisementItem = `
              <h3 class="title-advertise">${companyName}</h3>
              <h4>${title}</h4>
               <p class="text-advertise">${text}</p>
               
                <div>
                    <b>Email:</b>
                    <span class="email-adveritse">${companyEmail}</span>
                </div>
                <div>
                    <h3>Phone:</h3>
                    <span class="phone-adveritse">${companyPhoneNumber}</span>
                </div>
`

  // document.querySelector(".ads-list").innerHTML += advertisementItem
  window.location.href = "main.html";

}





