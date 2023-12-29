import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";

// /profile/did:plc:hoge/feed/fuga のような入力を許容する正規表現
const regex = /\/profile\/did:plc:[\w!?/+\-_~;.,*&@#$%()'[\]]+\/feed\/[\w!?/+\-_~;.,*&@#$%()'[\]]+/;

const schema = z.object({
  url: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(regex, { message: "入力の形式が正しくありません" }),
});

export const Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const assignmentSample = (url: string) => {
    setValue("url", url);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(async (d) => {
          const url = d.url;
          const match = url.match(regex);

          if (match) {
            const feedString = match[0];
            await router.push(feedString);
          } else {
            alert("入力の形式が正しくありません");
            reset();
          }
        })}
      >
        <div className="relative">
          <label htmlFor="url" className="block text-gray-700 text-sm font-bold">
            URL
          </label>
          <input
            id="url"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ここにURLをペースト"
            {...register("url")}
          />
          {errors.url?.message && <p className="text-red-500 text-xs italic mt-3">{`${errors.url?.message}`}</p>}
        </div>
        <div className="flex gap-2 justify-end mt-6">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={() => {
              reset();
            }}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            送信
          </button>
        </div>
        <div className="flex gap-2 justify-start mt-12">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              assignmentSample("https://bsky.app/profile/did:plc:x7xlmbv44chfxfs2rjacel4j/feed/aaalchvbgoi7o");
            }}
          >
            サンプル ①
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              assignmentSample("https://tokimeki.blue/profile/did:plc:odqmsar3ikz5ubokya4sempk/feed/aaabfn4o34jdi");
            }}
          >
            サンプル ②
          </button>
        </div>
      </form>
    </div>
  );
};
