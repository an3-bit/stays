import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  
  // Sign up form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (!signupData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    try {
      // In a real app, this would be an API call
      console.log('Creating account...', signupData);
      
      toast({
        title: "Account Created!",
        description: "Welcome to TVHStays! Let's get started with your hosting journey.",
      });
      
      // Navigate to the introduction page
      navigate('/become-host/intro');
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, this would be an API call
      console.log('Logging in...', loginData);
      
      toast({
        title: "Welcome Back!",
        description: "Successfully logged in. Redirecting to your dashboard.",
      });
      
      // Navigate to host dashboard for returning users
      navigate('/host-dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    toast({
      title: `${provider} Login`,
      description: `Redirecting to ${provider} authentication...`,
    });
    // In a real app, this would redirect to OAuth provider
    setTimeout(() => navigate('/become-host/intro'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to TVHStays
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Join Our Community of Trusted Hosts
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Ready to Host? Sign Up or Log In to get started
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signup" className="text-sm font-medium">Sign Up</TabsTrigger>
                <TabsTrigger value="login" className="text-sm font-medium">Log In</TabsTrigger>
              </TabsList>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Why Join?</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Access global travelers</li>
                    <li>• Easy property management tools</li>
                    <li>• Dedicated 24/7 support</li>
                    <li>• Flexible earning opportunities</li>
                  </ul>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={signupData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setSignupData({ ...signupData, agreeToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to TVHStays' <Link to="/terms" className="text-orange-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-orange-600 hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Create Account
                  </Button>
                </form>
              </TabsContent>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Log In
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('Apple')}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.56.37 4.703.644 3.967 1.007c-.74.364-1.379.85-2.009 1.48C1.329 3.117.843 3.756.48 4.496.116 5.231-.158 6.089-.32 7.318-.484 8.553-.528 8.924-.528 12.545s.044 3.992.207 5.227c.163 1.229.437 2.087.8 2.822.364.74.85 1.379 1.48 2.009.63.63 1.269 1.116 2.009 1.48.735.364 1.593.638 2.822.8 1.235.164 1.606.208 5.227.208s3.992-.044 5.227-.207c1.229-.163 2.087-.437 2.822-.8.74-.365 1.379-.85 2.009-1.48.63-.63 1.116-1.269 1.48-2.009.364-.735.638-1.593.8-2.822.164-1.235.208-1.606.208-5.227s-.044-3.992-.207-5.227c-.163-1.229-.437-2.087-.8-2.822-.365-.74-.85-1.379-1.48-2.009C20.883 1.329 20.244.843 19.504.48 18.769.116 17.911-.158 16.682-.32 15.447-.484 15.076-.528 11.455-.528s-3.992.044-5.227.207c-1.229.163-2.087.437-2.822.8-.74.365-1.379.85-2.009 1.48C.767 3.117.281 3.756-.082 4.496c-.364.735-.638 1.593-.8 2.822C-.984 8.553-1.028 8.924-1.028 12.545s.044 3.992.207 5.227c.163 1.229.437 2.087.8 2.822.365.74.85 1.379 1.48 2.009.63.63 1.269 1.116 2.009 1.48.735.364 1.593.638 2.822.8 1.235.164 1.606.208 5.227.208s3.992-.044 5.227-.207c1.229-.163 2.087-.437 2.822-.8.74-.365 1.379-.85 2.009-1.48.63-.63 1.116-1.269 1.48-2.009.364-.735.638-1.593.8-2.822.164-1.235.208-1.606.208-5.227s-.044-3.992-.207-5.227c-.163-1.229-.437-2.087-.8-2.822C23.172.843 22.533.329 21.793-.034 21.058-.398 20.2-.672 18.971-.835 17.736-.999 17.365-1.043 13.744-1.043s-3.992.044-5.227.207c-1.229.163-2.087.437-2.822.8-.74.365-1.379.85-2.009 1.48C4.156 2.094 3.67 2.733 3.306 3.473c-.364.735-.638 1.593-.8 2.822C2.342 7.53 2.298 7.901 2.298 11.522s.044 3.992.207 5.227c.163 1.229.437 2.087.8 2.822.365.74.85 1.379 1.48 2.009.63.63 1.269 1.116 2.009 1.48.735.364 1.593.638 2.822.8 1.235.164 1.606.208 5.227.208s3.992-.044 5.227-.207c1.229-.163 2.087-.437 2.822-.8.74-.365 1.379-.85 2.009-1.48.63-.63 1.116-1.269 1.48-2.009.364-.735.638-1.593.8-2.822.164-1.235.208-1.606.208-5.227s-.044-3.992-.207-5.227c-.163-1.229-.437-2.087-.8-2.822C23.172.843 22.533.329 21.793-.034 21.058-.398 20.2-.672 18.971-.835 17.736-.999 17.365-1.043 13.744-1.043z"/>
                  </svg>
                  Continue with Apple
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </Button>
              </div>
            </div>

            {/* Already a host callout */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already a host? {' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-orange-600 hover:underline font-medium"
                >
                  Log in to manage your listings
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BecomeHostAuth;