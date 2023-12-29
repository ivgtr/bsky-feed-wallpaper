export const Description = () => {
  return (
    <div className="w-full max-w-xs md:max-w-md">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl text-gray-700 font-bold">【使い方】</h3>
        <ul>
          <li className="mt-2">
            <p className="text-gray-700">
              1. BlueSkyの<a href="https://bsky.app/feeds">マイフィード</a>
              などから表示したいフィードのURLをコピーしてください。
            </p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">
              2. 入力欄に貼り付け送信をクリックすると、カスタムフィードに投稿された画像を壁紙っぽく表示します。
            </p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">3. フルスクリーン（F11）で表示すると、より壁紙っぽくなります。</p>
          </li>
        </ul>
        <h3 className="text-xl text-gray-700 font-bold mt-8">【ショートカット】</h3>
        <ul>
          <li className="mt-2">
            <p className="text-gray-700">F11: フルスクリーン</p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">数字キー: 速度変更</p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">Space: 再生・停止</p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">Enter: 次のスクリーン</p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">A: アバターの表示・非表示</p>
          </li>
          <li className="mt-2">
            <p className="text-gray-700">C: 時計の表示・非表示</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
