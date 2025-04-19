import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In');
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Email Sign In
    console.log('Email Sign In', { email, password });
  };

  return (
    <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-y-auto ext-bg-background">
      <>
        <CardHeader className="ext-space-y-1">
          <CardTitle className="ext-text-2xl ext-font-bold">Welcome</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className="ext-space-y-4">
          <Button
            variant="outline"
            className="ext-w-full ext-flex ext-items-center ext-justify-center ext-gap-2"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="ext-w-5 ext-h-5" />
            Sign in with Google
          </Button>
          <div className="ext-relative">
            <div className="ext-absolute ext-inset-0 ext-flex ext-items-center">
              <span className="ext-w-full ext-border-t" />
            </div>
            <div className="ext-relative ext-flex ext-justify-center ext-text-xs ext-uppercase">
              <span className="ext-bg-background ext-px-2 ext-text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <form onSubmit={handleEmailSignIn} className="ext-space-y-4">
            <div className="ext-space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="ext-space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="ext-w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="ext-flex ext-justify-center">
          <p className="ext-text-sm ext-text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="#" className="ext-text-primary ext-underline ext-underline-offset-4">
              Sign up
            </a>
          </p>
        </CardFooter>
      </>
    </div>
  );
}
