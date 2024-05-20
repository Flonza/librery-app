export interface ErrorMessage {
  [key: string]: string;
}


export interface AuthResponse {
  header: String,
  message: String,
  success: boolean,
  statusCode: number,
  severity: String,
  response: any
}
