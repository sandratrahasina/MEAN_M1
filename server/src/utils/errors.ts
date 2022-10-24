export class UserTypeError extends Error {
  constructor(userType: string) {
    super(`User type <${userType}> not defined`)
  }
}

export class UserDatasError extends Error {
  constructor(missing?: string) {
    super(`Missing ${missing || 'data'}`)
  }
}

export class UnauthorizedActionError extends Error {
  constructor() {
    super(`You are not allowed to perform this action`)
  }
}
