<?php

namespace App\Enums;

enum ResourceType: string
{
    case News = 'news';
    case Statement = 'statement';
    case Report = 'report';
    case PressRelease = 'press_release';
    case Publication = 'publication';
    case SuccessStory = 'success_story';
    case PolicyBrief = 'policy_brief';
    case Research = 'research';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::News => 'News',
            self::Statement => 'Statement',
            self::Report => 'Report',
            self::PressRelease => 'Press Release',
            self::Publication => 'Publication',
            self::SuccessStory => 'Success Story',
            self::PolicyBrief => 'Policy Brief',
            self::Research => 'Research',
            self::Other => 'Other',
        };
    }
}
