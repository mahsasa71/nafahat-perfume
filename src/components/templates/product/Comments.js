
import Comment from "@/components/module/comment/Comment";
import CommentForm from "./CommentForm";

const Comments = ({ productID, comments }) => {
  const acceptedComments = comments.filter((comment) => comment.isAccept);

  return (
    <div className="w-full font-Dana">
      <p className="text-lg mb-4">نظرات ({acceptedComments.length}) :</p>
      <hr className="opacity-10 mb-8" />

     
  
<main className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-[50px]">
    <div className="w-full lg:w-1/2">
<div className="text-zinc-700 dark:text-white font-Dana">
  {acceptedComments.length === 0 
    ? "هنوز دیدگاهی برای این محصول ثبت نشده است." 
    : `${acceptedComments.length} دیدگاه برای این محصول ثبت شده:`
  }
</div>
    <div className="space-y-6">
      {comments.map(
        (comment) =>
          comment.isAccept && <Comment key={comment._id} {...comment} />
      )}
    </div>
  </div>


  <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl h-fit">
    <CommentForm productID={productID} />
  </div>

 

</main>
    </div>
  );
};

export default Comments;