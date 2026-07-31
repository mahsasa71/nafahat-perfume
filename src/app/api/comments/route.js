import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, productID } = reqBody;

    // Validation

    const comment = await CommentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });

    const updatedProduct = await ProductModel.findOneAndUpdate(
      {
        _id: productID,
      },
      {
        $push: {
          comments: comment._id,
        },
      }
    );

    return Response.json(
      {
        message: "Comment created successfully :))",
        data: comment,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  await CommentModel.findOneAndUpdate(
    {},
    {
      isAccept: true,
    }
  );
  const comments = await CommentModel.find({}, "-__v");
  return Response.json(comments);
}


export async function DELETE(req) {
  try {
    connectToDB();
    const { id } = await req.json();

    await CommentModel.findOneAndDelete({ _id: id });
    
    // اختیاری: حذف آیدی کامنت از آرایه comments در مدل Product
    await ProductModel.findOneAndUpdate(
      { comments: id },
      { $pull: { comments: id } }
    );

    return Response.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

// ۲. متد ثبت پاسخ (ما فیلدی به نام answer در مدل نداریم، پس باید در مدل هم اضافه کنیم)
export async function PUT(req) {
  try {
    connectToDB();
    const { id, answer } = await req.json();

    await CommentModel.findOneAndUpdate(
      { _id: id },
      { answer, isAccept: true } // معمولاً وقتی پاسخ می‌دهیم، تایید هم می‌شود
    );

    return Response.json({ message: "Answer submitted successfully" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}