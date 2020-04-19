class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login #they're not going to have a token yet if they haven't logged in yet

  # POST /auth/login
  def login
    @user = User.find_by_username(login_params[:username])
    if @user.authenticate(login_params[:password]) #authenticate method provided by Bcrypt (a gem package that hashes passwords) and 'has_secure_password'
      token = encode(user_id: @user.id, username: @user.username)
      render json: { user: @user, token: token }, status: :ok
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end
  
  # GET /auth/verify
  def verify
    render json: @current_user, status: :ok #return user data
  end


  private

  def login_params
    params.require(:auth).permit(:username, :password)
  end
end