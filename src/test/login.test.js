import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import LoginForm from '../components/login/login-form';
import { useDispatch, useLocation } from 'react-redux';
import ExistingEmailsList from '../components/dashboard/existing-email';
let container = null;
let failed = '';

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
                failed = cb.payload.data.heading;
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

it('render login form and complete login', () => {
    act(() => {
        render(<LoginForm />, container);
    });
    container.querySelector('#username').innerHTML = 'user@gmail.com';
    container.querySelector('#password').innerHTML = 'abc';
    const submitBtn = container.querySelector("#sign-in");
    // expect(submitBtn.innerHTML).toBe('Sign In');
    act(() => {
        submitBtn.disabled = false;
        submitBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // expect(submitBtn).toHaveBeenCalledTimes(1);
    expect(failed).toBe('Login Failed');
})