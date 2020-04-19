class CommentsController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :set_comment, only: [:update, :destroy]

  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  # GET /comments/1
  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)
    @comment.user = @current_user
    @post = Post.find(params[:post_id])#we have post that will be associated with comment
    @comment.post = @post #post of comment is now associated with post from line 22

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = @current_user.comments.find(params[:id])#a user can have many comments
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comment).permit(:content, :user_id, :post_id)
    end
end
