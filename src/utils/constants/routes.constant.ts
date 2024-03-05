export const Routes = {
  FILE: {
    prefix: 'file',
    upload: '/upload',
    uploadMultiple: '/upload/multiple',
  },
  OTP: {
    prefix: 'otp',
    send: '/send',
    verify: '/verify',
  },
  AUTH: {
    prefix: 'auth',
    signUp: '/sign-up',
    signIn: '/sign-in',
    signOut: '/sign-out',
    emailVerification: '/email-verification',
    changePassword: '/change-password',
  },
  USER: {
    prefix: 'user',
    getOne: '/:userId',
    avatar: '/avatar',
    list: '/list',
  },
  FOLLOW: {
    prefix: 'follow',
    getOne: '/:userId',
    followings: '/followings',
    followers: '/followers',
    newFollowers: '/new-followers',
    topFollowed: '/top-followed',
  },
};
