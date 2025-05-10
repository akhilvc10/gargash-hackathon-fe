import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Assuming these are shadcn/ui components. Ensure they are correctly installed and imported.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner"; // Ensure sonner and a Toaster component are set up in your app

interface SignUpProps {
  onComplete: () => void;
  language: "en" | "ar"; // This prop is not currently used in the component's logic
}

// Schema for the info step
const infoSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(5, { message: "Phone number must be at least 5 digits." }),
});

// Schema for the OTP step
const otpSchema = z.object({
  otp: z.string().min(4, { message: "OTP must be at least 4 digits." }),
});

type InfoFormValues = z.infer<typeof infoSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const SignUp = ({ onComplete, language }: SignUpProps) => {
  const [step, setStep] = useState<"info" | "otp">("info");
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [userInfo, setUserInfo] = useState<InfoFormValues | null>(null);

  // Form for the first step (email and phone)
  const infoForm = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  // Form for the second step (OTP)
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
  });

  // Log form errors whenever they change
  useEffect(() => {
    if (Object.keys(infoForm.formState.errors).length > 0) {
      console.log("Info form validation errors:", infoForm.formState.errors);
    }
    if (Object.keys(otpForm.formState.errors).length > 0) {
      console.log("OTP form validation errors:", otpForm.formState.errors);
    }
  }, [infoForm.formState.errors, otpForm.formState.errors]);

  const generateOtp = () => {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  const onSubmitInfo = (data: InfoFormValues) => {
    console.log("onSubmitInfo triggered. Data:", data);
    setUserInfo(data);
    
    // Generate a new OTP
    const otp = generateOtp();
    
    // This function will ONLY be called if email and phone are valid
    toast.success(`Verification code sent: ${otp}`, {
      description: "Please use this code to verify your account.",
      duration: 10000,
    });
    
    setStep("otp");
    console.log("Step changed to OTP");
  };

  const onSubmitOTP = (data: OtpFormValues) => {
    console.log("onSubmitOTP triggered. OTP:", data.otp);
    
    // Verify if the entered OTP matches the generated OTP
    if (data.otp === generatedOtp) {
      toast.success("Account verified successfully!");
      onComplete();
      console.log("onComplete called");
    } else {
      toast.error("Invalid OTP", {
        description: "The verification code you entered is incorrect.",
      });
    }
  };

  console.log("Rendering SignUp component. Current step:", step);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden font-sans">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700 z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-400 filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl rounded-lg">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            {step === "info" ? "Create Your Account" : "Verify Your Identity"}
          </CardTitle>
          <CardDescription className="text-blue-100 text-center">
            {step === "info"
              ? "Enter your email and phone number to get started."
              : "Enter the verification code sent to your email/phone."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "info" ? (
            <Form {...infoForm}>
              <form 
                onSubmit={infoForm.handleSubmit(onSubmitInfo)} 
                className="space-y-4"
              >
                <FormField
                  control={infoForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 pl-10 rounded-md focus:ring-2 focus:ring-blue-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={infoForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            type="tel"
                            placeholder="+971 XX XXX XXXX"
                            {...field}
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 pl-10 rounded-md focus:ring-2 focus:ring-blue-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-6 bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={infoForm.formState.isSubmitting}
                >
                  {infoForm.formState.isSubmitting ? "Continuing..." : "Continue"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form 
                onSubmit={otpForm.handleSubmit(onSubmitOTP)} 
                className="space-y-4"
              >
                {generatedOtp && (
                  <div className="bg-white/30 p-3 rounded-md text-center mb-4">
                    <p className="text-sm text-white/80 mb-1">Your verification code is:</p>
                    <p className="text-2xl font-bold tracking-wider">{generatedOtp}</p>
                    <p className="text-xs text-white/70 mt-1">Please enter this code below</p>
                  </div>
                )}

                {userInfo && (
                  <div className="bg-white/20 p-3 rounded-md mb-4">
                    <p className="text-sm text-white/80 mb-1">Verifying account for:</p>
                    <p className="text-sm"><Mail className="inline h-4 w-4 mr-1" /> {userInfo.email}</p>
                    <p className="text-sm"><Phone className="inline h-4 w-4 mr-1" /> {userInfo.phone}</p>
                  </div>
                )}
                
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="Enter OTP"
                          {...field}
                          className="bg-white/20 border-white/20 text-white placeholder:text-white/50 text-center text-2xl tracking-widest rounded-md focus:ring-2 focus:ring-blue-300 py-3"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3 mt-6">
                  <Button
                    type="submit"
                    className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={otpForm.formState.isSubmitting}
                  >
                    {otpForm.formState.isSubmitting ? "Verifying..." : "Verify & Continue"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      console.log("Back button clicked, changing step to info");
                      setStep("info");
                      otpForm.reset();
                    }}
                    className="w-full border-white/20 text-white hover:bg-white/10 font-semibold py-3 rounded-md transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
