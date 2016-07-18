# Setup

## Structure

- Client Side
  - Endpoint
    - https://codingkids.jp
    - RedirectTo(/https?:\/\/(www\.)?codingkids\.jp/, 'https://codingkids.jp')
  - S3
  - CloudFront
  - Certificate Manager
  - Route53
- Server Side
  - Google Spreadsheet
  - Google App Script

## Domain

  - Regist Domain
      - codingkids.jp

  - AWS Route 53
    - Hosted zones
      - [Create Hosted Zone]
        - Domain Name: [codingkids.jp]
        - Comment: [Soak Main Domain]
        - Type: [Public Hosted Zone]
        - [Create]
      - [Create Record Set]
        - Name: []
        - Type: [A – IPv4 address]
        - Alias: [Yes]
        - Alias Target: [CloudFront]
        - Routing Policy: [Simple]
        - Evaluate Target Health: [No]
      - [Create Record Set]
        - Name: [www]
        - Type: [A – IPv4 address]
        - Alias: [Yes]
        - Alias Target: [CloudFront]
        - Routing Policy: [Simple]
        - Evaluate Target Health: [No]

  - Onamae
    - Domain NAVI
    - Change Nameserver: AWS Route53 NS 1-4
    - Change Whois: Technical Contact Information

  ### DNSの浸透チェック

  ```
  dig codingkids.jp ns
  ```

## AWS S3 Server

### AWS S3バケットの作成

- AWSのS3のコンソールにアクセス

### ログ用バケット

- [バケットを作成]をクリック
- バケットの作成ダイアログ
  - バケット名: logs.codingkids.jp
  - リージョン: Tokyo
  - [作成]

### コンテンツ用バケット

- [バケットを作成]をクリック
- バケットの作成ダイアログ
  - バケット名: codingkids.jp
  - リージョン: Tokyo
  - [作成]
- プロパティの設定
  - アクセス許可
    -  [バケットポリシーの追加]
      ```
{
  "Version":"2012-10-17",
  "Statement": [{
    "Sid": "Allow Public Access to All Objects",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::codingkids.jp/*"
  }]
}
      ```
    - CORS設定の追加
      ```
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
      ```
  - 静的ウェブサイトホスティング
    - [ウェブサイトのホスティングを有効にする]を選択
      - インデックスドキュメント: [index.html]
      - エラードキュメント: [index.html]
      - [保存]
  - ログ記録
    - 有効: [チェック]
    - ターゲットバケット: [logs.codingkids.jp]
    - ターゲットプレフィックス: [root/]
    - [保存]

### wwwサブドメイン用バケット

www有りでも無しでもアクセスできるように
wwwサブドメインを設定する

- [バケットを作成]をクリック
- バケットの作成ダイアログ
  - バケット名: www.codingkids.jp
  - リージョン: Tokyo
  - [作成]
- プロパティの設定
  - 静的ウェブサイトホスティング
    - [別のホスト名にすべてのリクエストをリダイレクトする]を選択
    - すべてのリクエストをリダイレクトします: [codingkids.jp]
    - [保存]


## CloudFront

- AWS CloudFront
  - [Create Distribution]
  - Web > [Get Started]
    - Origin Settings
      - Origin Domain Name: [codingkids.jp.s3-website-ap-northeast-1.amazonaws.com]
        - Important: Not Select Bucket Name!
      - Other: Dafault
    - Default Cache Behavior Settings
      - Other: Dafault
    - Distribution Settings
      - Alternate Domain Names: [codingkids.jp,www.codingkids.jp]
      - Default Root Object: [index.html]
      - Logging: [On]
      - Bucket for Logs: [logs.codingkids.jp]
      - Log Prefix: [cdn/]
      - Other: Dafault
    - [Create Distribution]
