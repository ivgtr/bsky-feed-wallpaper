export const Description = () => {
  return (
    <div className="w-full max-w-xs md:max-w-md">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl text-gray-700 font-bold">【使い方】</h3>
        <ul>
          <li className="mt-2">
            1. BlueSkyの<a href="https://bsky.app/feeds">マイフィード</a>
            などから表示したいフィードのURLをコピーしてください。
          </li>
          <li className="mt-2">
            2. 入力欄に貼り付け送信をクリックすると、カスタムフィードに投稿された画像を壁紙っぽく表示します。
          </li>
          <li className="mt-2">3. フルスクリーン（F11）で表示すると、より壁紙っぽくなります。</li>
        </ul>
        <h3 className="text-xl text-gray-700 font-bold mt-8">【ショートカット】</h3>
        <ul>
          <li className="mt-2">F11: フルスクリーン</li>
          <li className="mt-2">数字キー: 速度変更</li>
          <li className="mt-2">Space: 停止・再生切り替え</li>
          <li className="mt-2">Enter: 次のスクリーン</li>
        </ul>
      </div>
    </div>
  );
};
