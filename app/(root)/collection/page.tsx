import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQUestion } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const Home = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const result = await getSavedQUestion({
    clerkId,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="max:sm:flex-col mt-11 flex justify-between gap-5 sm:items-center">
        <LocalSearchBar
          iconPostion="left"
          route="/"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: QuestionCardProps) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no saved question to show"
            description="Be the first to break the slience! 🚀 Ask a question and kickstart the
        discussion. Our query could be the next big thing othes learn from. Get
        invloved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;