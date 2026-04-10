import { create } from "zustand";

import { TestAnswerOption } from "../lib/personality-test";

interface UserTestAnswersState {
  userTestAnswers: (TestAnswerOption["type"] | undefined)[];
  setUserTestAnswers: (
    newUserTestAnswers: (TestAnswerOption["type"] | undefined)[]
  ) => void;
}

const useUserTestAnswersStore = create<UserTestAnswersState>((set) => ({
  userTestAnswers: [],
  setUserTestAnswers: (newUserTestAnswers) =>
    set(() => ({
      userTestAnswers: newUserTestAnswers,
    })),
}));

export default useUserTestAnswersStore;
