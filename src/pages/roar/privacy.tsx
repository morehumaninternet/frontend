import React from 'react'
import PrivacyTosPage from '../../components/roar/privacy-tos-page'
import RoarSEO from '../../components/roar/roar-seo'

export default function PrivacyPage(): JSX.Element {
  return (
    <PrivacyTosPage>
      <RoarSEO title="Privacy Policy" />
      <h1>Privacy Policy</h1>
      <h3>1. Information Collection & Usage</h3>
      <p>
        We collect your twitter username, profile image, and email address by receiving this information when you authenticate with Twitter. We track websites
        you visit within the extension so that we can find the appropriate Twitter handle. Whenever you click the extension, a secure HTTPS request is made to
        our server. No personally identifying information is sent in that request that could tie back to you and no record is made of your having visited the
        site on our server. When you post feedback, we use the permission you have previously granted to post a tweet using your account. The public tweet
        contents are exactly as they appeared to you in the extension. We save a record of the exact URLs you visited when taking each screenshot, but do not
        post those publicly.
      </p>

      <h3>2. Third Party Relationships</h3>
      <p>
        This extension posts to Twitter using your account. By using More Human Internet’s services, you agree not to violate any of the policies set out in
        Twitter’s{' '}
        <a href="https://twitter.com/en/privacy">
          privacy policy
        </a>{' '}
        or{' '}
        <a href="https://twitter.com/en/tos">
          terms of service
        </a>
        .
      </p>

      <h3>3. Cookies Policy</h3>
      <p>We use cookies to keep you authorized on Twitter.</p>

      <h3>4. Transfer of Business</h3>
      <p>
        If ownership of all or substantially all of our business changes, or we undertake a corporate reorganization (including merger or consolidation) or any
        other action or transfer between More Human Internet entities, you expressly consent to More Human Internet transferring your information to the new
        owner or successor entity so that we can continue providing our services. If required, More Human Internet will notify the applicable data protection
        agency in each jurisdiction of such a transfer in accordance with the notification procedures under applicable data protection laws.
      </p>

      <h3>5. Updates to Privacy Policy</h3>
      <p>
        We may update this Privacy Policy to reflect changes in our information practices. If we make any material changes, we will provide notice on this
        website, and we may notify you by email (sent to the email address specified in your account), prior to the change becoming effective. We encourage you
        to periodically review this page for the latest information on our privacy practices. If you continue to use the Services after those changes are in
        effect, you agree to the revised policy.
      </p>

      <h3>6. Dispute Resolution</h3>
      <p>
        If you have a complaint about More Human Internet’s privacy policies, please let us know at{' '}
        <a href="mailto:privacy@morehumaninternet.org">
          privacy@morehumaninternet.org
        </a>
        .
      </p>
    </PrivacyTosPage>
  )
}
