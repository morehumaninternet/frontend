import React from 'react'
import PrivacyTosPage from '../../components/roar/privacy-tos-page'
import RoarSEO from '../../components/roar/roar-seo'

export default function TosPage(): JSX.Element {
  return (
    <PrivacyTosPage>
      <RoarSEO title="Terms & Conditions" />
      <h1>Terms & Conditions</h1>
      <h3>1. License Grant</h3>
      <p>We grant you a worldwide, non-exclusive and non-transferable right to use our services.</p>

      <h3>2. Support</h3>
      <p>
        If you are in need of support, contact us at{' '}
        <a href="mailto:support@morehumaninternet.org">
          support@morehumaninternet.org
        </a>
        .
      </p>

      <h3>3. Copyright Infringement</h3>
      <p>
        If you believe that our Services have been used in a way that constitutes copyright infringement, you should follow the process outlined here:{' '}
        <a href="https://www.dmca.com/faq/Report-copyright-infringement">
          https://www.dmca.com/faq/Report-copyright-infringement
        </a>
        .
      </p>

      <h3>4. Disclaimer of Warranties</h3>
      <p>
        Our Service is provided “as is.” We hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of
        merchantability, fitness for a particular purpose and non-infringement. We make no warranty that our Services will be error-free or that access thereto
        will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, our Services at your own
        discretion and risk.
      </p>

      <h3>5. Limitation of Liability</h3>
      <p>
        In no event will we be liable with respect to any subject matter of this Agreement under any contract, negligence, strict liability or other legal or
        equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for
        interruption of use or loss or corruption of data; (iv) for any amounts that exceed the fees paid by you to us under this agreement during the twelve
        (12) month period prior to the cause of action. We shall have no liability for any failure or delay due to matters beyond their reasonable control. The
        foregoing shall not apply to the extent prohibited by applicable law.
      </p>

      <h3>6. Termination</h3>
      <p>
        We may terminate your access to all or any part of our Services at any time, with or without cause, with or without notice, effective immediately. If
        you wish to terminate this Agreement, you may simply discontinue using our services. All provisions of this Agreement which by their nature should
        survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
        liability.
      </p>

      <h3>7. Governing Law</h3>
      <p>
        The Agreements (and any non-contractual disputes / claims arising out of or in connection with them) are subject to the laws of the state of Delaware,
        United States of America, without regard to choice or conflicts of law principles.
      </p>
    </PrivacyTosPage>
  )
}
