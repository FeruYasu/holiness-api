export default interface ICreateAnnouncementDTO {
  title: string;
  content: string;
  user_id: string;
  ministry_id: string;
  image?: string;
  video?: string;
  link?: string;
  event_id?: string;
}
