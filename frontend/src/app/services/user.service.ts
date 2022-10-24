import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import User from '../models/User.model'

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  loginState: boolean = false
  user!: User
  userType!: string | null
  token!: string | null

  constructor(private http: HttpClient) {}

  get LoginState() {
    return this.loginState
  }

  set LoginState(value: boolean) {
    this.loginState = value
  }

  toggleLoginState() {
    this.LoginState = !this.loginState
  }

  private loginAction(data: { token: string; user: User }, userType: string) {
    this.token = data.token
    this.user = new User({ ...data.user })
    this.userType = userType
    window.localStorage.setItem('token', this.token)
    window.localStorage.setItem('id', this.user.id || data.user.id || '')
    window.localStorage.setItem('nom', this.user.nom || data.user.nom || '')
    window.localStorage.setItem(
      'adresse',
      this.user.adresse || data.user.adresse || ''
    )
    window.localStorage.setItem(
      'prenom',
      this.user.prenom || data.user.prenom || ''
    )
    window.localStorage.setItem(
      'photoUrl',
      this.user.photoUrl || data.user.photoUrl || ''
    )
    window.localStorage.setItem('userType', this.userType)
    this.loginState = true
  }

  signup(
    formData: FormData,
    userType: string,
    callback?: () => void,
    onError?: () => void
  ) {
    this.http
      .post<{ token: string; user: User }>(
        'http://localhost:8080/api/auth/signup/' + userType,
        formData
      )
      .subscribe({
        next: response => {
          this.loginAction(response, userType)
          callback && callback()
        },
        error: () => onError && onError(),
      })
  }

  login(
    { email, motDePasse }: { email: string; motDePasse: string },
    userType: string,
    callback?: () => void,
    onError?: () => void
  ) {
    const params = new HttpParams()
      .set('email', email)
      .set('motDePasse', motDePasse)
    this.http
      .get<{ token: string; user: User }>(
        'http://localhost:8080/api/auth/login/' + userType,
        { params }
      )
      .subscribe({
        next: response => {
          this.loginAction(response, userType)
          callback && callback()
        },
        error: () => onError && onError(),
      })
  }

  clear() {
    this.user = new User()
    this.LoginState = false
    this.userType = null
    this.token = null
  }

  logout() {
    window.localStorage.clear()
    this.clear()
  }
}
