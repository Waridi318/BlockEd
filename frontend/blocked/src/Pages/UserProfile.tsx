// import React from 'react';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";
// import { useNavigate } from 'react-router-dom';

// const formSchema = z.object({
//   fullName: z.string().min(2, {
//     message: "Full name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   experience: z.enum(["beginner", "intermediate", "advanced"], {
//     required_error: "Please select your experience level."
//   }),
//   goals: z.string().min(10, {
//     message: "Please describe your learning goals in at least 10 characters."
//   }).max(500, {
//     message: "Goals description must not exceed 500 characters."
//   }).optional(),
// });

// interface UserProfileFormProps {
//   pathId: string;
//   pathTitle: string;
// }

// const UserProfile = ({ pathId, pathTitle }: UserProfileFormProps) => {
//   const navigate = useNavigate();
  
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       experience: "beginner" as const,
//       goals: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // In a real app, this would save to a database
//     // For now, we'll save to localStorage
//     const profiles = JSON.parse(localStorage.getItem('learningProfiles') || '{}');
//     profiles[pathId] = {
//       ...values,
//       createdAt: new Date().toISOString(),
//       pathId,
//       progress: 0,
//     };
    
//     localStorage.setItem('learningProfiles', JSON.stringify(profiles));
    
//     toast({
//       title: "Profile Created",
//       description: `Your profile for ${pathTitle} has been created successfully.`,
//     });
    
//     // Navigate to the learning path
//     navigate(`/learning-path/${pathId}`);
//   }

//   return (
//     <div className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 md:p-8">
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl blur-xl -z-10" />
      
//       <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
//         Create Your Learning Profile
//       </h2>
//       <p className="text-gray-300 mb-8">
//         To access the {pathTitle} learning path, please create your profile. This helps us personalize your learning experience.
//       </p>
      
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Full Name</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="Enter your full name" 
//                     {...field} 
//                     className="bg-black/60 border-purple-500/30 focus:border-purple-500/50"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="Enter your email address" 
//                     type="email" 
//                     {...field} 
//                     className="bg-black/60 border-purple-500/30 focus:border-purple-500/50"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <FormField
//             control={form.control}
//             name="experience"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Experience Level</FormLabel>
//                 <FormControl>
//                   <div className="flex gap-4">
//                     {["beginner", "intermediate", "advanced"].map((level) => (
//                       <div key={level} className="flex items-center">
//                         <input
//                           type="radio"
//                           id={level}
//                           value={level}
//                           checked={field.value === level}
//                           onChange={() => field.onChange(level)}
//                           className="w-4 h-4 mr-2 accent-purple-600"
//                         />
//                         <label 
//                           htmlFor={level} 
//                           className="capitalize text-gray-300"
//                         >
//                           {level}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <FormField
//             control={form.control}
//             name="goals"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Learning Goals (Optional)</FormLabel>
//                 <FormControl>
//                   <Textarea 
//                     placeholder="What do you hope to achieve from this learning path?" 
//                     {...field}
//                     className="min-h-[120px] bg-black/60 border-purple-500/30 focus:border-purple-500/50"
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   This helps us understand your objectives and tailor recommendations.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <Button 
//             type="submit" 
//             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
//           >
//             Create Profile & Start Learning
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default UserProfile;