import React from "react";
import Container from "../Container";
import Title from "../../form/Title";
import FormInput from "../../form/FormInput";
import Submit from "../../form/Submit";
import CustomLink from "../../form/CustomLink";

export default function Signup() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign Up</Title>
          <FormInput label='Name' placeholder="Jatin Sharma" name="name" />
          <FormInput label='Email' placeholder="Jatinsharma2231@gmail.com" name="email" />
          <FormInput label='Password' placeholder="********" name="password" />
          <Submit value='Sign up'/>
          
          <div className="flex justify-between">
            <CustomLink to='/auth/forget-password'>Forget Password</CustomLink>
            <CustomLink to='/auth/signin'>Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
