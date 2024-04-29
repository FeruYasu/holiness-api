export default interface ICreateAnnouncementDTO {
  title: string;
  content: string;
  photo?: string;
  user_id: string;
  ministry_id?: string;
}
