/**
 *
 * Profile Controller
 *
 */

(function(){
  'use strict';

  angular.module('neuralquestApp')
    .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl ($state, md5, auth, profile, FirebaseUrl, Auth, $timeout) {
      var profileCtrl = this;

      profileCtrl.profile = profile;
      profileCtrl.updateProfile = updateProfile;
      profileCtrl.isPasswordUser = isPasswordUser;
      profileCtrl.profile = auth;
      profileCtrl.resetPwdToggle = false;
      profileCtrl.changePwdIfMatch = changePwdIfMatch;
      profileCtrl.resetEle = resetEle;

      if (auth.google) {
        profileCtrl.pwdUser = false;
        profileCtrl.profile.displayName = auth.google.displayName;
        profileCtrl.profile.profileImageURL = auth.google.profileImageURL;
      }
      if (auth.facebook) {
        profileCtrl.pwdUser = false;
        profileCtrl.profile.displayName = auth.facebook.displayName;
        profileCtrl.profile.profileImageURL = auth.facebook.profileImageURL;
      }
      if (auth.password) {
        profileCtrl.pwdUser = true;
        console.log('user info in profile.',auth.password);
        profileCtrl.profile.displayName = auth.password.displayName;
        profileCtrl.profile.emailAddress = auth.password.email;
        profileCtrl.profile.profileImageURL = auth.password.profileImageURL;

        var ref = new Firebase(FirebaseUrl+'/users/'+Auth.$getAuth().uid);
        ref.on('value', function(user){
          console.log('ref', user.val());
          console.log('ref', Auth.$getAuth());
        }, function(err){
          console.log(err);
        })
      }
      /*=============================================
      =            METHOD IMPLEMENTATION            =
      =============================================*/
      function isPasswordUser() {
        if(auth.password){
          return true;
        } else {
          return false;
        }
      }

      function resetEle() {
        profileCtrl.oldNewSame = false;
        profileCtrl.passwordReset = false;
        profileCtrl.passwordNotMatchError = false;
        profileCtrl.resetPwdToggle = !profileCtrl.resetPwdToggle;
        profileCtrl.pwdResetError = '';
      }

      function changePwdIfMatch() {
        //validate the password first.
        if(Auth.validatePwd(profileCtrl.profile.newPwd)){
          if(profileCtrl.profile.newPwd === profileCtrl.profile.oldPwd){
            profileCtrl.oldNewSame = true;
            profileCtrl.passwordReset = false;
            profileCtrl.passwordNotMatchError = false;
            profileCtrl.resetPwdToggle = !profileCtrl.resetPwdToggle;
          } else if(profileCtrl.profile.newPwd === profileCtrl.profile.newPwdConfirm){
            var ref = new Firebase(FirebaseUrl);
            ref.changePassword({
              email: auth.password.email,
              newPassword: profileCtrl.profile.newPwd,
              oldPassword: profileCtrl.profile.oldPwd
            }, function(err) {
              if(!err){
                $timeout(function(){
                  profileCtrl.passwordReset = true;
                  profileCtrl.passwordNotMatchError = false;
                  profileCtrl.oldNewSame = false;
                  profileCtrl.resetPwdToggle = !profileCtrl.resetPwdToggle;
                },50);
                console.log("user password has been changed");
              } else {
                console.log("Error while changing the password", err);
                $timeout(function(){
                  profileCtrl.pwdResetError = err;
                  profileCtrl.passwordReset = false;
                  profileCtrl.passwordNotMatchError = true;
                  profileCtrl.oldNewSame = false;
                  profileCtrl.resetPwdToggle = !profileCtrl.resetPwdToggle;  
                },50);
              }
            });
            /*=====================================
            =            working here.             =
            it show your password has been changed when wrong old password is put. where to verify?
            =====================================*/
          
            profileCtrl.profile.newPwd = '';
            profileCtrl.profile.oldPwd = '';
            profileCtrl.profile.newPwdConfirm = '';

          } else {
            profileCtrl.passwordNotMatchError = true;
            profileCtrl.passwordReset = false;
            profileCtrl.oldNewSame = false;
            profileCtrl.profile.newPwd = '';
            profileCtrl.profile.oldPwd = '';
            profileCtrl.profile.newPwdConfirm = '';
          }
        } else {
          profileCtrl.error = {message: "The password should contain at least one number and special character. Please try again."};
          $timeout(function(){
            profileCtrl.error = null
          }, 3000);
        }
      }

      function updateProfile() {
        if(auth.google){
          profileCtrl.profile.$save();
          $state.go('accordion');
        }
        if(auth.facebook){
          profileCtrl.profile.$save();
          $state.go('accordion');
        }
        if(auth.password){
          profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
          profileCtrl.profile.$save();
          //todo: change this
          $state.go('accordion');
        }
      }
    }

})();

