import SimpleMDE from 'react-simplemde-editor'

export default function Editor({ content, setContent }): JSX.Element {
  return <SimpleMDE value={content} onChange={setContent} />
}
