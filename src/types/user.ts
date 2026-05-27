export type User = {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar?: string | null;
  onboardingCompleted: boolean;
};
