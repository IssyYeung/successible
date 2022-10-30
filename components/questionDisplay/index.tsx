import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Radio, RadioGroup, Button, Icon } from '@blueprintjs/core';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import OptionalExtras from '../optionalExtras';
import type { Question } from '../../interfaces/questionTypes';
import CustomButton from '../customButton';

interface QuestionDisplayProps extends Question {
  handleSubmitOnClick: () => void;
  totalQuestions?: number;
  clockIsAnimated: boolean;
  setClockIsAnimated: Dispatch<SetStateAction<boolean>>;
}

const QuestionDisplay = ({
  id,
  question,
  answer,
  resA,
  resB,
  resC,
  resD,
  highlight,
  image,
  definition,
  timeLimit,
  handleSubmitOnClick,
  totalQuestions,
  clockIsAnimated,
  setClockIsAnimated,
}: QuestionDisplayProps): JSX.Element => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const handleOnRadioClick = (event: FormEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.currentTarget.value);
  };
  let msg: SpeechSynthesisUtterance | null = null;
  useEffect((): any => {
    const synth = window.speechSynthesis;
    if (!synth) {
      return <span>Aw... your browser does not support Speech Synthesis</span>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    msg = new window.SpeechSynthesisUtterance();
    var voices = synth.getVoices();
    msg.voice = voices.filter(function (voice) {
      return voice.name == 'Daniel';
    })[0];
    msg.lang = 'en-US';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    return;
  });

  const speechHandler = (
    msg: SpeechSynthesisUtterance | null,
    text: string,
  ) => {
    if (msg) {
      msg.text = text;
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="p-4 max-w-4xl flex-col justify-center mx-auto">
      <div className="p-4 flex flex-row items-center">
        <div className="flex-1" />
        <h1 className=" flex-2 text-center" id="question-title">
          {id === 0 ? 'Question 1 of 1' : `Question ${id} of ${totalQuestions}`}
        </h1>
        <div className="flex-1 flex justify-end items-center" id="timer">
          <Button
            onClick={() => {
              setClockIsAnimated((prevClockIsAnimated) => !prevClockIsAnimated);
            }}
            className="!p-2 !m-3 !rounded-md !shadow !bg-grey !text-black !w-32"
          >
            {clockIsAnimated ? 'Hide Animation' : 'Show Animation'}
          </Button>
          <CountdownCircleTimer
            isPlaying
            duration={timeLimit}
            colors={clockIsAnimated ? '#3c096c' : '#d9d9d9'}
            size={75}
            onComplete={() => {
              handleSubmitOnClick();
            }}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds =
                remainingTime % 60 < 10
                  ? `0${remainingTime % 60}`
                  : remainingTime % 60;

              return `${minutes}:${seconds}`;
            }}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="flex gap-5 bg-light rounded-lg p-5">
        <div className="flex-1" id="question">
          <h3 id="heading-id">Question:</h3>
          <p>{question}</p>
          <Button
            onClick={() => speechHandler(msg, question)}
            className="!w-8 !h-8 !rounded-md !shadow !bg-grey-lightest !border !border-solid !border-grey-dark"
          >
            <Icon icon="volume-up" size={16} color="grey-dark" />
          </Button>
        </div>
        <div className="flex-1 bg-lightest rounded-lg px-3" id="answers">
          <h3 className="pb-0">Answers:</h3>
          <RadioGroup
            name="Answers"
            onChange={(event) => {
              handleOnRadioClick(event);
            }}
            selectedValue={selectedAnswer}
            className="my-5 box-border"
          >
            <div className="flex flex-row items-center mb-2">
              <Radio value={'A'} label={resA} className="mb-0 mr-3" />
              <Button
                onClick={() => speechHandler(msg, resA)}
                className="!w-8 !h-8 !rounded-md !shadow !bg-grey-lightest !border !border-solid !border-grey-dark"
              >
                <Icon icon="volume-up" size={16} color="grey-dark" />
              </Button>
            </div>
            <div className="flex flex-row items-center mb-2">
              <Radio value={'B'} label={resB} className="mb-0 mr-3" />
              <Button
                onClick={() => speechHandler(msg, resB)}
                className="!w-8 !h-8 !rounded-md !shadow !bg-grey-lightest !border !border-solid !border-grey-dark"
              >
                <Icon icon="volume-up" size={16} color="grey-dark" />
              </Button>
            </div>
            <div className="flex flex-row items-center mb-2">
              <Radio value={'C'} label={resC} className="mb-0 mr-3" />
              <Button
                onClick={() => speechHandler(msg, resC)}
                className="!w-8 !h-8 !rounded-md !shadow !bg-grey-lightest !border !border-solid !border-grey-dark"
              >
                <Icon icon="volume-up" size={16} color="grey-dark" />
              </Button>
            </div>
            <div className="flex flex-row items-center mb-2">
              <Radio value={'B'} label={resD} className="mb-0 mr-3" />
              <Button
                onClick={() => speechHandler(msg, resD)}
                className="!w-8 !h-8 !rounded-md !shadow !bg-grey-lightest !border !border-solid !border-grey-dark"
              >
                <Icon icon="volume-up" size={16} color="grey-dark" />
              </Button>
            </div>
          </RadioGroup>
          <CustomButton
            type="submit"
            onClick={handleSubmitOnClick}
            id="submit-btn"
            title="Submit"
          />
        </div>
      </div>
      <OptionalExtras
        highlightContent={highlight}
        diagramContent={image}
        definitionsContent={definition}
      />
    </div>
  );
};

export default QuestionDisplay;
