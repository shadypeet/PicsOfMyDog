class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(user_params)
    render "api/users/show"
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :password,
      :name,
      :biography,
      :profile_pic_url,
      :cover_photo_url)
  end

end
