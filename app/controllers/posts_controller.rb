class PostsController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :set_post, only: [:update, :destroy]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    @post = Post.find(params[:id])
    render json: @post, include: :comments
  end

  # POST /posts
  def create
    @post = Post.new(post_params) #params is a general term. params in a rails controller refers to URL of :id (slugs in the URL) but includes the request body in axios.
    @post.user = @current_user #associate whoever created the post with that user. which user made the post? in ordert to make post, have to provide token to prove who you are 
    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private 
    # Use callbacks to share common setup or constraints between actions. other methods are actions
    def set_post
      @post = @current_user.posts.find(params[:id]) #instead of checking all the posts through the post model, we're only checking posts that belong to current_user so we can never get a request to delete/update a post that doesn't belong to the user making the request.
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:title, :content, :user_id)
    end
end
