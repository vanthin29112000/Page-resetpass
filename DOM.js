function getParameterByName(name) {
  var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
document.addEventListener('DOMContentLoaded', () => {
    var mode = getParameterByName('mode');
    var actionCode = getParameterByName('oobCode');
    var continueUrl = getParameterByName('continueUrl');
    var lang = getParameterByName('lang');
  
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        handleResetPassword(auth, actionCode, continueUrl, lang);
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.
        handleRecoverEmail(auth, actionCode, lang);
        break;
      case 'verifyEmail':
        // Display email verification handler and UI.
        handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      default:
        // Error: invalid mode.
    }
  }, false);

function handleResetPassword(auth, actionCode, continueUrl, lang) {

    auth.verifyPasswordResetCode(actionCode).then((email) => {
      var accountEmail = email;
  
      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
      var newPassword = Math.random().toString(36).slice(-8);
  
      // Save the new password.
      auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
        document.getElementsByClassName("bg-resetpassword")[0].innerHTML = "";
        document.getElementsByClassName("bg-resetpassword")[0].innerHTML = `
        <div class="title_reset">
            <p>Đặt lại mật khẩu mới</p>
        </div>
        <div class="new-password">
            <p class="title-name">Mật khẩu mới :</p> 
            <p id="password">`+newPassword+`</p>
        </div>
        <a class="back-web-customer" href="http://127.0.0.1:5501/test/public/customer/index.html">
            <i class="fas fa-arrow-circle-left"></i>
            <div class="turn-back">Quay lại trang</div>
        </a>`;
      }).catch((error) => {
        document.getElementsByClassName("bg-resetpassword")[0].innerHTML = "";
        document.getElementsByClassName("bg-resetpassword")[0].innerHTML = `
        <div class="bg-notication">
            <p>Lệnh đặt mật khẩu đã hết hạn !!!</p>
        </div>
        <a class="back-web-customer" href="http://127.0.0.1:5501/test/public/customer/index.html">
            <i class="fas fa-arrow-circle-left"></i>
            <div class="turn-back">Quay lại trang</div>
        </a>`;
        console.log(newPassword);
      });
    }).catch((error) => {
        document.getElementsByClassName("bg-resetpassword")[0].innerHTML = "";
        document.getElementsByClassName("bg-resetpassword")[0].innerHTML = `
        <div class="bg-notication">
            <p>Lệnh đặt mật khẩu đã hết hạn !!!</p>

        </div>
        <a class="back-web-customer" href="http://127.0.0.1:5501/test/public/customer/index.html">
            <i class="fas fa-arrow-circle-left"></i>
            <div class="turn-back">Quay lại trang</div>
        </a>`;
        console.log(newPassword);
    });
  }