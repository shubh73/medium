import { useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const errorName = () =>
  toast.error("The Name field is required!", {
    id: "name",
  });
const errorEmail = () =>
  toast.error("The Email field is required!", {
    id: "email",
  });
const errorComment = () =>
  toast.error("The Comment field is required!", {
    id: "comment",
  });
const successSubmit = () =>
  toast.success("Yayy comment submitted", {
    id: "successSubmit",
  });

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Head>
        <title>{post.slug.current}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Header />

        <img
          className="w-full h-40 object-cover"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />

        <article className="max-w-3xl mx-auto p-5">
          <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
          <h2 className="text-xl font-light text-gray-500 mb-3">
            {post.description}
          </h2>

          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full border border-green-500"
              src={urlFor(post.author.image).url()!}
              alt=""
            />
            <p className="font-extralight text-sm">
              Blog post by{" "}
              <span className="text-green-600">{post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-10">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="text-xl font-bold my-5" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border border-[#3f8dce]" />

        {submitted ? (
          <div className="flex flex-col p-10 my-10 bg-[#ffc017] text-white mx-auto">
            <h3 className="text-3xl font-bold">
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will appear below!</p>
            <div className="hidden">{successSubmit()}</div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-base text-[#ffc017] font-semibold">
              Enjoyed the article?
            </h3>
            <h4 className="text-2xl font-bold">Leave a comment below!</h4>
            <hr className="py-3 mt-2" />

            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />

            <label className="block mb-5">
              <span className="text-gray-700 ">Name</span>
              <input
                {...register("name", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-[#3f8dce] "
                type="text"
                placeholder="Shubh Porwal"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700 ">Email</span>
              <input
                {...register("email", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-[#3f8dce] "
                type="email"
                placeholder="shubhporwal@gmail.com"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700 ">Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full focus:outline-[#3f8dce] "
                placeholder="What are your thoughts?"
                rows={8}
              />
            </label>

            {/* Errors */}
            {errors.name && <div className="hidden">{errorName()}</div>}
            {errors.email && <div className="hidden">{errorEmail()}</div>}
            {errors.comment && <div className="hidden">{errorComment()}</div>}

            <input
              type="submit"
              className="shadow bg-[#ffc017] hover:text-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </form>
        )}

        <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-[#ffc017] space-y-2 rounded">
          <h3 className="text-3xl font-semibold">Comments</h3>
          <hr className="pb-2" />
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <span className="text-[#ffc017] font-medium">
                  {comment.name}:
                </span>{" "}
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
        current
        }
      }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
        name,
        image
        },
        'comments': *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true],
        description,
        mainImage,
        slug,
        body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
