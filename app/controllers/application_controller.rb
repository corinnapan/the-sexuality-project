#app controller inherits from action controller. we can add anything to this controller and then other controllers will get access to those methods

class ApplicationController < ActionController::API 
  SECRET_KEY = Rails.env == 'production'? ENV['SECRET_KEY'] :
  Rails.application.secrets.secret_key_base.to_s #built-in and given to us from Rails, to_s converts to string. random string of text

  def encode(payload, exp = 24.hours.from_now) #default expiration
    payload[:exp] = exp.to_i #adds expiration to payload object. #whatever data you want in the token
    JWT.encode(payload, SECRET_KEY)
  end

  def decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0] #turns back an array and you want first thing in the array which is the decoded token
    HashWithIndifferentAccess.new decoded  
  end
  def authorize_request
    header = request.headers['Authorization'] #make a variable header and value is Bearer token (whatever the token is)
    header = header.split(' ').last if header #takes token if header is provided
    begin
      @decoded = decode(header)#decoded token. whatever we put into payload is here 
      @current_user = User.find(@decoded[:user_id])#we grab user id from payload to find user in database
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
