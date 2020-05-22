export default interface ISessionDb {
  findBySession: (session: string) => Promise<string>
  saveSession: ({}: { session: string; name: string }) => Promise<boolean>
}
