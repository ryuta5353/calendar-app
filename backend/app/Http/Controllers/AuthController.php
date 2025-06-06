<?php

namespace App\Http\Controllers;

use App\Models\User; // Userモデルを使うために追加
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; // パスワードのハッシュ化に必要
use Illuminate\Support\Facades\Validator; // 入力値のバリデーションに必要
use Tymon\JWTAuth\Facades\JWTAuth; // JWTトークン操作に必要
use Tymon\JWTAuth\Exceptions\JWTException; // JWT関連のエラーハンドリングに必要

class AuthController extends Controller
{
    /**
     * 新しいユーザーを登録するメソッド
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // 1. 入力値のバリデーション
        // Reactから送られてくる 'name', 'email', 'password', 'password_confirmation' の値が
        // 想定通りの形式であるか、または必須であるかなどをチェックします。
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255', // 必須、文字列、最大255文字
            'email' => 'required|string|email|max:255|unique:users', // 必須、文字列、メールアドレス形式、最大255文字、usersテーブルで一意
            'password' => 'required|string|min:8|confirmed', // 必須、文字列、最低8文字、'password_confirmation'というフィールドと値が一致
        ]);

        // バリデーションに失敗した場合
        if ($validator->fails()) {
            // エラーメッセージをJSON形式で422 Unprocessable Entityとして返します
            return response()->json($validator->errors(), 422);
        }

        // 2. ユーザーの作成
        // バリデーションが成功したら、新しいユーザーをデータベースに保存します。
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // ★重要: パスワードは必ずハッシュ化して保存します！
        ]);

        // 3. JWTトークンの生成
        // ユーザーが登録されたら、そのユーザー情報を使ってJWTトークンを生成します。
        try {
            // fromUserメソッドで、特定のユーザーに対するトークンを生成します。
            if (!$token = JWTAuth::fromUser($user)) {
                // トークンの生成に失敗した場合（通常は発生しにくいが念のため）
                return response()->json(['error' => 'トークンの生成に失敗しました'], 500);
            }
        } catch (JWTException $e) {
            // JWTライブラリ内部で例外が発生した場合（例: シークレットキーが設定されていないなど）
            return response()->json(['error' => 'トークンの生成に失敗しました: ' . $e->getMessage()], 500);
        }

        // 4. 成功レスポンスの返却
        // ユーザー登録が成功し、トークンが発行されたら、その情報をJSON形式で返します。
        return response()->json([
            'message' => 'ユーザー登録が完了しました',
            'user' => $user, // 作成されたユーザー情報（必要に応じて表示）
            'access_token' => $token, // 発行されたJWTトークン
            'token_type' => 'bearer', // トークンのタイプ（Bearer認証）
            'expires_in' => config('jwt.ttl') * 60 // トークンの有効期限（config/jwt.phpで設定された分数を秒に変換）
        ], 201); // HTTPステータスコード 201 Created を返します（リソースの作成成功）
    }

    /**
     * ユーザーを認証し、JWTトークンを返すメソッド（ログイン処理）
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // ログインに必要な認証情報（メールアドレスとパスワード）を取得
        $credentials = $request->only('email', 'password');

        try {
            // JWTAuth::attempt() で認証を試みます。
            // データベースのユーザーとパスワードが一致すればトークンを返しますが、
            // 失敗するとfalseを返します。
            if (!$token = JWTAuth::attempt($credentials)) {
                // 認証情報が無効な場合（メールアドレスまたはパスワードが間違っている）
                return response()->json(['error' => '認証情報が無効です'], 401); // 401 Unauthorized
            }
        } catch (JWTException $e) {
            // JWTライブラリ内部で例外が発生した場合
            return response()->json(['error' => 'トークンの生成に失敗しました'], 500);
        }

        // 認証成功した場合、トークン情報をJSON形式で返します。
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ]);
    }

    public function getUserCount(){
        try{
            $userCount = User::count();
            return response()->json([
                "message" => "ユーザ数を取得しました",
                "user_count"=>$userCount
            ],200);

        }catch(\Exception $e){
            return reponse()->json([
                "error"=>"Failed to get number of users",
                "details"=>$e->getMessage()
            ],500);
        }
    }
}