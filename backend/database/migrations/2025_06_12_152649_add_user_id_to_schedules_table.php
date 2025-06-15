<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            //
            // user_id カラムを追加し、usersテーブルのidに外部キー制約をつけます。
            // onDelete('cascade') は、関連するユーザーが削除された場合、そのユーザーのスケジュールも自動的に削除されるようにします
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            //
            $table->dropConstrainedForeignId("user_id");
        });
    }
};
