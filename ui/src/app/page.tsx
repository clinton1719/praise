import Link from 'next/link';

export default function Home() {
  return (
    <div className="action">
      <Link className="actionItem" id="add_repo" href="/add_repo">
        Add Repo
      </Link>
      <Link className="actionItem" id="view_pr" href="/view_pr">
        View PR&apos;s
      </Link>
    </div>
  );
}
