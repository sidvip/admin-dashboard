import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ComposeMail from '../components/dashboard/compose';
import users from '../mock-data/users.json';
let sentMsg = '';
const localStorageMock = (function () {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key) {
            delete store[key];
        },

        getAll() {
            return store;
        },
    };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

localStorageMock.setItem('userData', JSON.stringify(users));
localStorageMock.setItem('email', 'derick@gmail.com');
let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

jest.mock('react-redux', () => {
    return {
        useDispatch: () => {
            return (cb) => {
                sentMsg = cb.payload.data.heading;
            }
        }
    }
});

jest.mock('../components/dashboard/existing-email', () => {
    return function DummySection() {
        return (
            <div>{''}</div>
        )
    }
})
jest.mock('react-router-dom', () => {
    return {
        useLocation: () => {
            return {
                reload: () => "login success"
            }
        }
    }
})

it('render compose form and send email', () => {
    act(() => {
        render(<ComposeMail />, container);
    });
    const values = ['derick@gmail.com', 'shawn@gmail.com, rick@gmail.com', 'Testing Email', 'It is a test email'];
    let idx = 0;
    for (let ele of container.querySelector('form').elements) {
        ele.value = values[idx];
        ++idx;
    };
    const sendBtn = container.querySelector("#send-email");
    // expect(submitBtn.innerHTML).toBe('Sign In');
    act(() => {
        sendBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // expect(submitBtn).toHaveBeenCalledTimes(1);
    expect(sentMsg).toBe('Sent Email');
})