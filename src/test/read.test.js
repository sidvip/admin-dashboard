import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import users from '../mock-data/users.json';
import ReadMail from '../components/dashboard/read';
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
        },
        useSelector: () => {
            return {
                mail: {
                    composing: false,
                    selectedCategory: "inbox",
                    unreadCount: 0
                }
            }
        }
    }
});

jest.mock('react-router-dom', () => {
    return {
        useParams: () => {
            return {
                mailId: 0
            }
        }
    }
});

it('render read mail', () => {
    act(() => {
        render(<ReadMail />, container);
    });
    // expect(submitBtn).toHaveBeenCalledTimes(1);
    console.log(container.textContent);
    expect(container.textContent).toMatch(/Subject/i);
})