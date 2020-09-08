import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
   category = [
    {
      id: 1,
      name: 'HTML',
      image: 'assets/images/category/html.png'
    },
    {
      id: 2,
      name: 'CSS',
      image: 'assets/images/category/css.svg'
    },
    {
      id: 3,
      name: 'PHP',
      image: 'assets/images/category/php-logo.png'
    }
  ];
  questions = [
    {
      id: 1,
      question: 'What is the difference between XML and HTML?',
        a: 'HTML is used for exchanging data, XML is not.',
        b: 'HTML can have user defined tags, XML cannot',
        c: 'XML is used for exchanging data, HTML is not',
        d: '',
      answer: 'b',
      selected: null,
      category: 1
    },
    {
    id: 2,
    question: 'Opening Tag of HTML Tag is called as ________.',
      a: 'Closed Tag',
      b: 'Starting Tag',
      c: 'Forward Tag',
      d: 'Enging Tag',
    answer: 'b',
    selected: null,
    category: 1
    },
    {
      id: 3,
      question: 'HTML stands for ________.',
      a: 'Hyper Text Markup Language',
      b: 'Hyper Text Makeup Language',
      c: 'None of these',
      d: 'Hyper Tech Markup Language',
      answer: 'a',
      selected: null,
      category: 1
    },
    {
      id: 4,
      question: 'HTML program is saved using _________ extension.',
      a: '.htl',
      b: '.html',
      c: 'None of these',
      d: '.htlm',
      answer: 'b',
      selected: null,
      category: 1
    },
    {
      id: 5,
      question: 'HTML Code written in MAC can be browsed in a PC with Window 7 installed , User will be able to see same design that was designed on the MAC Pc.',
      a: 'true',
      b: 'false',
      c: '',
      d: '',
      answer: 'a',
      selected: null,
      category: 1
    },
    {
      id: 6,
      question: 'Who was the primary author of HTML?',
      a: 'ABrendan Eich',
      b: 'Sabeer Bhatiya',
      c: 'Tim Berners-Lee',
      d: 'Google Inc.',
      answer: 'c',
      selected: null,
      category: 1
    },
    {
      id: 7,
      question: 'Which of the following is valid colour code ?',
      a: '#000000;',
      b: '#0000000;',
      c: '#00000000;',
      d: '#000000000;',
      answer: 'a',
      selected: null,
      category: 1
    },
    {
      id: 8,
      question: 'Caption Tag in HTML ?',
      a: 'Is used to display the Title for table at the top;',
      b: 'Is used to display the Title for table at the bottom',
      c: 'Both',
      d: 'None',
      answer: 'c',
      selected: null,
      category: 1
    },
    {
      id: 9,
      question: ' Which of the following is used increase the row height?',
      a: 'Cellspacing',
      b: 'Cellpadding',
      c: 'Row span',
      d: 'Col span',
      answer: 'c',
      selected: null,
      category: 1
    },
    {
      id: 10,
      question: 'DOM stands for',
      a: 'CelDocument object model',
      b: 'Data object model',
      c: 'Document Oriented model',
      d: 'Data oriented model',
      answer: 'c',
      selected: null,
      category: 1
    },
    {
      id: 11,
      question: 'If we want define style for an unique element, then which css selector will we use ?',
      a: 'Id',
      b: 'text',
      c: 'class',
      d: 'name',
      answer: 'a',
      selected: null,
      category: 2
    },
    {
      id: 12,
      question: '	If we dont want to allow a floating div to the left side of an element, which css property will we use ?',
      a: 'margin',
      b: 'clear',
      c: 'float',
      d: 'padding',
      answer: 'b',
      selected: null,
      category: 2
    },
    {
      id: 13,
      question: 'Which of the following selector applies styles to elements that are valid per HTML5 validations set either with the pattern or type attributes?',
      a: ':valid',
      b: ':required',
      c: ':invalid',
      d: ':optional',
      answer: 'a',
      selected: null,
      category: 2
    },
    {
      id: 14,
      question: ' Which of the following selector selects an element if it’s the only child of its parent?',
      a: ':only-child',
      b: ':nth-oftype(n)',
      c: ':root',
      d: 'none of the mentioned',
      answer: 'c',
      selected: null,
      category: 2
    },
    {
      id: 15,
      question: 'Which of the following selector selects the elements that are currently enabled?',
      a: ':element',
      b: ':empty',
      c: ':enabled',
      d: 'none of the mentioned',
      answer: 'c',
      selected: null,
      category: 2
    },
    {
      id: 16,
      question: 'Which of the following selector selects the elements that are checked?',
      a: 'E ~ F',
      b: '::after',
      c: ':enabled',
      d: 'none of the mentioned',
      answer: 'c',
      selected: null,
      category: 2
    },
    {
      id: 17,
      question: 'Which css property you will use if you want to add some margin between a DIV\'s border and its inner text ?',
      a: 'spacing',
      b: 'margin',
      c: 'padding',
      d: 'inner-margin',
      answer: 'c',
      selected: null,
      category: 2
    },
    {
      id: 18,
      question: 'Which CSS property is used to control the text size of an element ?',
      a: 'font-size',
      b: 'font-style',
      c: 'text-size',
      d: 'text-style',
      answer: 'a',
      selected: null,
      category: 2
    },
    {
      id: 19,
      question: 'The default value of "position" attribute is _________.',
      a: 'fixed',
      b: 'absolute',
      c: 'inherit',
      d: 'relative',
      answer: 'd',
      selected: null,
      category: 2
    },
    {
      id: 20,
      question: 'When we write <img src="img.png">, what "img.png" inside double quote implies?',
      a: 'element',
      b: 'attribute',
      c: 'value',
      d: 'operator',
      answer: 'c',
      selected: null,
      category: 2
    },
  ];
  constructor() { }

  getQuestions(categoryId) {
    return new Observable((observer) => {
      const response = { success: false, error: '', data: [] };
      response.success = true;
      const data = this.questions.filter(que => que.category == categoryId);
      (<any>Object).assign( response.data, data);
      observer.next(response);
    });

  }

  getCategories() {
    return new Observable((observer) => {
      const response = { success: false, error: '', data: [] };
      response.success = true;
      response.data = this.category;
      observer.next(response);
    });
  }

  getQuestionsById(id) {
    if (id) {
      return new Observable((observer) => {
        const response = { success: false, error: '', data: Object };
        response.success = true;
        const data = this.questions.find(que => que.id === id);
        (<any>Object).assign( response.data, data);
        observer.next(response);
      });
    }

  }

  addQuestion(question) {
    const questionAdd =  this.questions.push(question);
    return new Observable((observer) => {
      const response = { success: false, error: '', data: [] };
      if (questionAdd) {
        response.success = true;
        response.data = this.questions;
      }
      observer.next(response);
    });
  }

  submitAnswer(id, selectedValue,categoryId?) {
    const ID = id - 1;
    selectedValue = selectedValue === 'Reset' ? null : selectedValue;
    this.questions[ID].selected = selectedValue;
    return new Observable((observer) => {
    const response = { success: false, error: '', data: [] };
    response.success = true;
    const data = this.questions.filter(que => que.category == categoryId);
    (<any>Object).assign( response.data, data);
    observer.next(response);
    });
  }
}
